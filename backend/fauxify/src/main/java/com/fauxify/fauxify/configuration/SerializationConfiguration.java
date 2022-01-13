package com.fauxify.fauxify.configuration;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Page;

import java.io.IOException;

@Configuration
public class SerializationConfiguration {

    @Bean
    public Module springDataPageModule(){
        JsonSerializer<Page> pageSerializer = new JsonSerializer<Page>() {
            @Override
            public void serialize(Page page, JsonGenerator jsonGenerator, SerializerProvider serializers) throws IOException {
                jsonGenerator.writeStartObject();
                jsonGenerator.writeNumberField("numberOfElements", page.getNumberOfElements());
                jsonGenerator.writeNumberField("totalElements", page.getTotalElements());
                jsonGenerator.writeNumberField("totalPages", page.getTotalPages());
                jsonGenerator.writeNumberField("number", page.getNumber());
                jsonGenerator.writeNumberField("size", page.getSize());
                jsonGenerator.writeBooleanField("first",page.isFirst());
                jsonGenerator.writeBooleanField("last",page.isLast());
                jsonGenerator.writeBooleanField("next",page.hasNext());
                jsonGenerator.writeBooleanField("prev",page.hasPrevious());

                jsonGenerator.writeFieldName("content");
                serializers.defaultSerializeValue(page.getContent(), jsonGenerator);
                jsonGenerator.writeEndObject();
            }
        };
        return new SimpleModule().addSerializer(Page.class,pageSerializer);
    }
}
