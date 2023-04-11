# Delete Book

**URL** : `/v1/book?bookId={bookId}`

**QUERY Parameters** : `bookId=[string]` where `bookId` is the ID of the Book in the
database.

**Method** : `DELETE`

## Success Response

**Condition** : If the book exists.

**Code** : `204 NO CONTENT`

**Content** : `{}`

## Error Responses

**Condition** : If there was no book available to delete.

**Code** : `404 NOT FOUND`

**Content** : `{}`

## Notes

* Will remove all comments for this book.
