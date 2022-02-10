# Structured Content 2022

## Development

For manual setup instructions, see the individual web/ and studio/ READMEs.

Alternatively, you can use Docker and docker-compose. (The setup is tested with
Docker version 20.10.12 and docker-compose version 1.25.3.)

Starting both studio and web:

```
docker-compose up
```

The Studio is available on http://localhost:3333 while the app is available on
http://localhost:3000.

If you only want to start one of the services, you can use `docker-compose up
studio` or `docker-compose up web` respectively.
