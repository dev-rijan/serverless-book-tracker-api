# Create Comment for book

**URL** : `/v1/comment`

**Method** : `POST`

**Data constraints**

Provide bookId and comment.

```json
{
    "bookId": "[string]",
    "comment": "[string]"
}
```

**Data example**

```json
{
    "bookId": "1d4212ed-8886-4afb-9ed0-325329e485b8",
    "comment": "Nice book"
}
```

## Success Response

**Condition** : If everything is OK.

**Code** : `201 CREATED`

**Content example**

```json
{
    "data": {
        "commentId": "ca48df91-b295-41e4-bbd1-e55641ed4452"
    },
    "message": "Comment successfully added",
    "status": "success"
}
```

## Error Responses
**Condition** : If fields are missed.

**Code** : `400 BAD REQUEST`
```
