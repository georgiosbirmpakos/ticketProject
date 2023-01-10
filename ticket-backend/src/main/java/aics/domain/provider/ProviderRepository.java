package aics.domain.provider;

import aics.domain.provider.entities.Provider;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ProviderRepository implements PanacheRepository<Provider> {

}