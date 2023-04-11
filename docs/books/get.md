# Get single book

**URL** : `/v1/book?bookId={bookId}`

**QUERY Parameters** : `bookId=[string]` where `bookId` is the ID of the Book on the
server.

**Method** : `GET`

## Success Response

**Condition** : If Book exists 

**Code** : `200 OK`

**Content example**

```json
{
    "data": {
        "book": {
            "title": "Clean architecture",
            "author": "C. Martin",
            "id": "790e8935-1d6a-45fe-9b71-88a84293a786",
            "commentCount": 0,
            "comments": []
        }
    },
    "message": "Book successfully retrieved",
    "status": "success"
}
```

## Error Responses

**Condition** : If Book does not exist with `id` of provided `bookId` parameter.

**Code** : `404 NOT FOUND`
