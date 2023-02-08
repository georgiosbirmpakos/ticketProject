package aics.domain.event;

import aics.domain.event.dtos.EventDto;
import aics.domain.event.dtos.EventOptionsDto;
import aics.domain.event.dtos.EventsFilterOptionsDto;
import aics.domain.event.entities.Event;
import aics.domain.event.models.EventFilters;
import aics.domain.hall.HallRepository;
import aics.domain.hall.SeatRepository;
import aics.domain.hall.entities.Hall;
import aics.domain.hall.entities.Seat;
import aics.domain.movie.MovieRepository;
import aics.domain.movie.MovieService;
import aics.domain.movie.entities.Movie;
import aics.domain.provider.ProviderRepository;
import aics.domain.provider.entities.Provider;
import aics.domain.ticket.TicketRepository;
import aics.domain.ticket.entities.Ticket;
import aics.infrastructure.core.LabelValue;
import aics.infrastructure.errors.TicketErrorStatus;
import aics.infrastructure.errors.TicketException;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.ImmutablePair;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class EventService {
    @Inject
    EventRepository eventRepository;
    @Inject
    MovieRepository movieRepository;
    @Inject
    HallRepository hallRepository;
    @Inject
    ProviderRepository providerRepository;
    @Inject
    TicketRepository ticketRepository;
    @Inject
    SeatRepository seatRepository;
    @Inject
    EventValidator eventValidator;
    @Inject
    MovieService movieService;

    public List<Event> fetchAllEvents() {
        List<Event> events = this.eventRepository.findAll().list();

        return events;
    }

    public List<Event> fetchFilteredEvents(EventFilters eventFilters) throws TicketException {
        if (eventFilters == null) {
            final String errorMsg = "eventFIlters was null";
            throw new TicketException(new Exception(errorMsg), errorMsg, TicketErrorStatus.UNPROCESSABLE_ENTITY_422);
        }
        LocalDateTime currentDate = LocalDateTime.now();
        if (eventFilters.getFromDate() != null && currentDate.isAfter(eventFilters.getFromDate())) {
            eventFilters.setFromDate(currentDate);
        }
        List<Event> events = this.eventRepository.findFiltered(eventFilters);

        return events;
    }

    public Event fetchEventById(Long eventId) {
        Event event = this.eventRepository.findById(eventId);

        return event;
    }


    public List<Event> fetchEventsPlayingNow() {
        EventFilters eventFilters = new EventFilters()
            .setFromDate(LocalDateTime.now());
        List<Event> events = this.eventRepository.findFiltered(eventFilters);
        return events;
    }

    public EventOptionsDto fetchEventOptions() {
        List<Movie> movies = this.movieRepository.findAll().list();
        List<LabelValue<Long>> moviesRefs = CollectionUtils.isNotEmpty(movies)
            ? movies.stream().map((movie -> new LabelValue<Long>(movie.getName(), movie.getMovieId()))).toList()
            : new ArrayList<>();

        List<Hall> halls = this.hallRepository.findAll().list();
        List<LabelValue<Long>> hallsRefs = CollectionUtils.isNotEmpty(halls)
            ? halls.stream().map((hall -> new LabelValue<Long>(hall.getProvider().getName() + "-" + hall.getName(), hall.getHallId()))).toList()
            : new ArrayList<>();

        return new EventOptionsDto()
            .setMoviesRefs(moviesRefs)
            .setHallsRefs(hallsRefs);
    }


    public EventsFilterOptionsDto fetchEventsFilterOptions() {
        List<Movie> movies = this.movieService.fetchMoviesPlayingNow();
        List<LabelValue<Long>> moviesRefs = new ArrayList<>();
        moviesRefs.add(new LabelValue<Long>("ΟΛΕΣ", 0L));
        moviesRefs.addAll(CollectionUtils.isNotEmpty(movies)
            ? movies.stream().map((movie -> new LabelValue<Long>(movie.getName(), movie.getMovieId()))).toList()
            : new ArrayList<>()
        );

        List<Provider> providers = this.providerRepository.findAll().list();
        List<LabelValue<Long>> providersRefs = new ArrayList<>();
        providersRefs.add(new LabelValue<Long>("ΟΛΑ", 0L));
        providersRefs.addAll(CollectionUtils.isNotEmpty(providers)
            ? providers.stream().map((provider -> new LabelValue<Long>(provider.getName(), provider.getProviderId()))).toList()
            : new ArrayList<>()
        );

        return new EventsFilterOptionsDto()
            .setMoviesRefs(moviesRefs)
            .setProvidersRefs(providersRefs);
    }

    public String createEvent(EventDto eventDto) {

        final String error = this.eventValidator.validateForCreateEvent(eventDto);
        if (StringUtils.isNotEmpty(error)) {
            return error;
        }

        ImmutablePair<Movie, String> findValidMovieResult = this.findValidMovie(eventDto.getMovieRef());
        if (findValidMovieResult.getRight() != null) {
            return findValidMovieResult.getRight();
        }

        ImmutablePair<Hall, String> findValidHallResult = this.findValidHall(eventDto.getHallRef());
        if (findValidHallResult.getRight() != null) {
            return findValidHallResult.getRight();
        }

        Event newEvent = new Event()
            .setName(eventDto.getName())
            .setEventDatetime(eventDto.getEventDatetime())
            .setDescription(eventDto.getDescription())
            .setEventPrice(eventDto.getEventPrice())
            .setMovie(findValidMovieResult.left)
            .setHall(findValidHallResult.left);

        List<Seat> eventHallSeats = this.seatRepository.fetchListByHallId(newEvent.getHall().getHallId());
        List<Ticket> tickets = new ArrayList<>();
        for (Seat seat : eventHallSeats) {
            Ticket newTicket = new Ticket()
                .setEvent(newEvent)
                .setSeat(seat);
            tickets.add(newTicket);
        }
        this.eventRepository.persist(newEvent);
        if (!tickets.isEmpty()) {
            this.ticketRepository.persist(tickets);
        }

        return null;
    }


    public String updateEvent(EventDto eventDto) {

        final String error = this.eventValidator.validateForUpdateEvent(eventDto);
        if (StringUtils.isNotEmpty(error)) {
            return error;
        }

        Event event = this.eventRepository.findById(eventDto.getEventId());
        if (event == null) {
            return "couldn't find event";
        }

        event.setName(eventDto.getName())
            .setEventDatetime(eventDto.getEventDatetime())
            .setDescription(eventDto.getDescription())
            .setEventPrice(eventDto.getEventPrice());

        this.eventRepository.persist(event);

        // TODO Alert Users

        return null;
    }

    public String deleteEventById(Long eventId) {
        if (eventId == null) {
            return "eventId was null";
        }
        Event event = this.eventRepository.findById(eventId);
        if (event == null) {
            return "couldn't find event";
        }

        this.ticketRepository.deleteList(event.getTickets());

        this.eventRepository.delete(event);

        // TODO Alert Users

        return null;
    }

    private ImmutablePair<Movie, String> findValidMovie(LabelValue<Long> movieRef) {
        if (movieRef == null) {
            return new ImmutablePair<>(null, "movieRef was null");
        }
        if (movieRef.value() == null) {
            return new ImmutablePair<>(null, "movieRef.value was null");
        }
        Movie movie = this.movieRepository.findById(movieRef.value());
        if (movie == null) {
            return new ImmutablePair<>(null, "movie was null");
        }
        return new ImmutablePair<>(movie, null);
    }

    private ImmutablePair<Hall, String> findValidHall(LabelValue<Long> hallRef) {
        if (hallRef == null) {
            return new ImmutablePair<>(null, "hallRef was null");
        }
        if (hallRef.value() == null) {
            return new ImmutablePair<>(null, "hallRef.value was null");
        }
        Hall hall = this.hallRepository.findById(hallRef.value());
        if (hall == null) {
            return new ImmutablePair<>(null, "hall was null");
        }
        return new ImmutablePair<>(hall, null);
    }
}