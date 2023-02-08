package aics.infrastructure.conf;

import io.quarkus.runtime.ShutdownEvent;
import io.quarkus.runtime.StartupEvent;
import org.jboss.logging.Logger;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;

@ApplicationScoped
public class AppLifecycleBean {

    private static final Logger LOGGER = Logger.getLogger("ListenerBean");

    void onStart(@Observes StartupEvent ev) {
        LOGGER.info("The application is starting...");
    }

    void onStop(@Observes ShutdownEvent ev) {
        LOGGER.info("The application is stopping...");
    }

//    public void init(@Observes io.vertx.mutiny.ext.web.Router router) {
//        router.routeWithRegex("\\/.+")
//            .handler(rc -> rc.reroute("/"));
//        router.errorHandler(404, rc -> {
//            System.out.println("THANOS!!");
//            rc.reroute("/");
////            rc.response().setStatusCode(302).putHeader("Location", "/index.html").end();
//        });
//    }
}
