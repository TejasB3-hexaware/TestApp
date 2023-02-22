package com.springbootms.exception;

public class EntityNotFoundException extends RuntimeException {
	public EntityNotFoundException(String exception) {
		super(exception);
	}
}
