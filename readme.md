# instructions

- export environment variables 
```bash
PARADYM_KEY
PARADYM_PROJECT_ID
PARADYM_TEMPLATE_ID
```

whereas `PARADYM_TEMPLATE_ID` must refer to paradym sd-jwt template with following schema:
```
name
surname
```

- start demo
```bash
pnpm run demo
```

You should see something along following lines:
```
RUNNING STAGE 1
Tenant cba328c5-9747-476a-a57e-1a5b043f3923 created DID: did:key:z6MknjbFoPKc3wb3CpMKqTyJMxWKmqbJ2AZm6ebTcrQ7XK3J
Going to accept credential from offer https://paradym.id/invitation?credential_offer_uri=https%3A%2F%2Fparadym.id%2Finvitation%2Feed57732-2f0f-4178-9f86-bd0270e4ea78%2Foffers%2F757ea017-855c-4955-a86f-f32393c50cc7%3Fraw%3Dtrue
Requesting token
Requesting credentials
Storing credentials
RUNNING STAGE 2
Tenant 5be1c7d6-7d96-4f48-9da4-974365dc206b created DID: did:key:z6Mkfqt25yM1R3AYqHRY7txfLjSrPGASmkZRc2LKP2txyA31
Going to accept credential from offer https://paradym.id/invitation?credential_offer_uri=https%3A%2F%2Fparadym.id%2Finvitation%2Feed57732-2f0f-4178-9f86-bd0270e4ea78%2Foffers%2Fa5ef368f-eb9b-4955-ac1b-a16792f4e916%3Fraw%3Dtrue
Requesting token
Requesting credentials
CredoError: Failed to validate sd-jwt-vc credential. Results = {"isValid":false,"error":{},"verification":{"isValid":false},"sdJwtVc":{"payload":{"vct":"https://metadata.paradym.id/types/liZVW6UxZ6-IdentityCard","cnf":{"kid":"did:key:z6Mkfqt25yM1R3AYqHRY7txfLjSrPGASmkZRc2LKP2txyA31#z6Mkfqt25yM1R3AYqHRY7txfLjSrPGASmkZRc2LKP2txyA31"},"iss":"did:web:metadata.paradym.id:940517bd-47eb-4c17-8978-c7a90d87d5fc","iat":1737468964,"_sd":["GDhHmAZIJXASf5kWmL3TaBJRMQUttAPvv7bXn5isMKw","Tz8GRjU22gttguLOpAfxCxgcUdZ1etHP9LuGCm5rM_8"],"_sd_alg":"sha-256"},"header":{"typ":"vc+sd-jwt","alg":"EdDSA","kid":"#z6MkrbKjmxtqBzBF4ZVYpdDWtrvUxyEeQK1t2pFFGGDG2D8F"},"compact":"eyJ0eXAiOiJ2YytzZC1qd3QiLCJhbGciOiJFZERTQSIsImtpZCI6IiN6Nk1rcmJLam14dHFCekJGNFpWWXBkRFd0cnZVeHlFZVFLMXQycEZGR0dERzJEOEYifQ.eyJ2Y3QiOiJodHRwczovL21ldGFkYXRhLnBhcmFkeW0uaWQvdHlwZXMvbGlaVlc2VXhaNi1JZGVudGl0eUNhcmQiLCJjbmYiOnsia2lkIjoiZGlkOmtleTp6Nk1rZnF0MjV5TTFSM0FZcUhSWTd0eGZMalNyUEdBU21rWlJjMkxLUDJ0eHlBMzEjejZNa2ZxdDI1eU0xUjNBWXFIUlk3dHhmTGpTclBHQVNta1pSYzJMS1AydHh5QTMxIn0sImlzcyI6ImRpZDp3ZWI6bWV0YWRhdGEucGFyYWR5bS5pZDo5NDA1MTdiZC00N2ViLTRjMTctODk3OC1jN2E5MGQ4N2Q1ZmMiLCJpYXQiOjE3Mzc0Njg5NjQsIl9zZCI6WyJHRGhIbUFaSUpYQVNmNWtXbUwzVGFCSlJNUVV0dEFQdnY3YlhuNWlzTUt3IiwiVHo4R1JqVTIyZ3R0Z3VMT3BBZnhDeGdjVWRaMWV0SFA5THVHQ201ck1fOCJdLCJfc2RfYWxnIjoic2hhLTI1NiJ9.HNGMd8wHk-CW93k1pjtPoyGs9Tsc6Ovf_GDN4pKE8e5ZEfLgnX02yVoBovKba5a0eFHHX6DAfv42gubvhuA4Cw~WyI3OTY3MzUzMTIwMTA3MzI1NzE4ODI4OCIsIm5hbWUiLCJtaWNoYWVsIl0~WyI4NTM1NTk5NDk3OTA0MzU5NDI4MzA0MTkiLCJzdXJuYW1lIiwiamFja3NvbiJd~","prettyClaims":{"vct":"https://metadata.paradym.id/types/liZVW6UxZ6-IdentityCard","cnf":{"kid":"did:key:z6Mkfqt25yM1R3AYqHRY7txfLjSrPGASmkZRc2LKP2txyA31#z6Mkfqt25yM1R3AYqHRY7txfLjSrPGASmkZRc2LKP2txyA31"},"iss":"did:web:metadata.paradym.id:940517bd-47eb-4c17-8978-c7a90d87d5fc","iat":1737468964,"surname":"jackson","name":"michael"}}}
```
