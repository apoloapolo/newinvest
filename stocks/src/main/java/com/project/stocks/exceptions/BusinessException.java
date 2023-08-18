package com.project.stocks.exceptions;

public class BusinessException extends RuntimeException{
    public  BusinessException(String message){
        super(message);
    }
}
