First==>Full-Stack backend.

Notes taking app.

=>In api contract first Routes(endpoints)+Methods were given to the frontend team.

=>First front-end was built with mock-api.

=>When the actual api was completed the apis were changed.

Swagger UI


1. Authentication.
2. Authorisation.
3. Get notes only for it's account.
4. Post/Create notes.
5. Update notes.
6. Delete notes.

## Rate Limiting

To protect against brute-force attacks, the login endpoint (`/auth/login`) is rate-limited. By default, a single IP address can make 5 login attempts every 15 minutes. If the limit is exceeded, the IP address will be blocked for 30 minutes.

These settings can be configured using the following environment variables:

- `RATE_LIMIT_WINDOW_MS`: The time window in milliseconds for which login attempts are counted (default: 900000, i.e., 15 minutes).
- `RATE_LIMIT_MAX`: The maximum number of login attempts allowed within the time window (default: 5).
- `RATE_LIMIT_BLOCK_DURATION`: The duration in milliseconds for which an IP address is blocked after exceeding the limit (default: 1800000, i.e., 30 minutes).


