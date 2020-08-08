const productDetail = `
{
    status: status,
    product: data.data.{
        id: id,
        breadcrumb: information.category.id,
        information: information,
        variants: variants,
        defaultImage: defaultImage,
        images: images,
        isVideoExist: videoUrl != null && videoUrl != '',
        price: price
    } || \`[]\`,
    error: status != to_number('200') && 'Error happend'
}
`;

export default productDetail;
