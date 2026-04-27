package com.mealapp.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = FutureOrTodayValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface FutureOrToday {
    String message() default "Ngày phải là hôm nay hoặc trong tương lai";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
