# Get all books

**URL** : `/v1/books`

**Method** : `GET`

**Data constraints** : `{}`

## Success Responses

```json
{
    "data": {
        "books": [
            {
                "title": "Clean architecture",
                "author": "C. Martin",
                "readAt": "2023-04-10",
                "id": "790e8935-1d6a-45fe-9b71-88a84293a786"
            },
            {
                "id": "ae9329ef-2226-4114-a126-b4fc06251812",
                "title": "book title",
                "readAt": "2023-04-10",
                "author": "book author"
            }
        ]
    },
    "message": "Book successfully retrieved",
    "status": "success"
}
```
