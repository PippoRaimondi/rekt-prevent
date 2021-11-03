# Endpoint contracts

## GET portfolio

Should return a list of portofolios for a given userid

Request:

```
{
  "userid": "test@test.com"
}
```

Response:

```
{ 
    "portfolios": [
        {
            "id": 123,
            "name": "Pot 1"
        }
    ]
}
```

## GET portfolio tokens

Should return a list of tokens for a given portofolioid

Request:

```
{
  "portofolioid": 123
}
```

Response:

{
    "tokens": [
        {
            "id": 123,
            "token_desc": "BTC",
            "initial_price": 123.00
        }
    ]
}
