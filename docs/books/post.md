# Create Book

**URL** : `/v1/book`

**Method** : `POST`

**Data constraints**

Provide title, author and readAt(optional) of book.

```json
{
    "title": "[string]",
    "author": "[string]",
    "readAt": "[string]"
}
```

**Data example**

```json
{
     "title": "Clean Architecture",
    "author": "C. martin",
    "readAt": "2023-01-23"
}
```

## Success Response

**Condition** : If everything is OK.

**Code** : `201 CREATED`

**Content example**

```json
{
    "data": {
        "book": {
            "id": "9bfb41d8-8f66-433d-b180-8c0ec0f14b3a",
            "title": "Clean architecture",
            "author": "C. Martin",
            "readAt": "2023-01-23"
        }
    },
    "message": "Book successfully created",
    "status": "success"
}
```

## Error Responses
**Condition** : If fields are missed.

**Code** : `400 BAD REQUEST`
```
