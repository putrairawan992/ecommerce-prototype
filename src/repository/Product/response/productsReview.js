const productsReview = `{
    status: status,
    review: data.data[].{
        rating: rating,
        images: images,
        message: message,
        reviewer : reviewer.{
            name : name,
            imageUrl : imageUrl
        }
    }|| \`[]\`,
    error: status != to_number('200') && 'Error happend'
}`

export default productsReview