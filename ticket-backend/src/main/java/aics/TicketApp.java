package aics;

import io.quarkus.logging.Log;
import io.quarkus.runtime.Quarkus;
import io.quarkus.runtime.QuarkusApplication;

public class TicketApp implements QuarkusApplication {

    @Override
    public int run(String... args) throws Exception {
        Log.trace("Start TicketApp.run");
        Quarkus.waitForExit();
        return 0;
    }

}
