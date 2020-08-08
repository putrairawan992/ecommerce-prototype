const productsReviewDetail = `{
 status : status,
 reviewDetail :  data.data.{
     averageRating: averageRating,
     totalReview: totalReview,
     details: details[].{
         ratingGroup : ratingGroup,
         total : total
     }
 }|| \`[]\`,
 error: status != to_number('200') && 'Error happend'
}`

export default productsReviewDetail