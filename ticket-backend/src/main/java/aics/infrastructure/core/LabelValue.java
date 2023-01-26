package aics.infrastructure.core;


import java.io.Serializable;

public record LabelValue<T extends Serializable>(String label, T value) implements Serializable {


    @Override
    public String toString() {
        return "LabelValue{" +
            "label='" + label + '\'' +
            ", value=" + value +
            '}';
    }
}
