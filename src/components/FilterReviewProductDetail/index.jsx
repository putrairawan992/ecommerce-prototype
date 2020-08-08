import React from 'react';
import { Rate, Radio } from 'antd';

function FilterReviewProductDetail({ actionChangeSelectFilter }) {
    const filterReviewMap = [
        {
            name: 'Semua',
            value: 'Semua',
            icon: ''
        },
        {
            name: 'Dengan Foto',
            value: 'Dengan Foto',
            icon: ''
        },
        {
            name: 'Dengan Deskripsi',
            value: 'Dengan Deskripsi',
            icon: ''
        },
        {
            name: '1',
            value: 1,
            icon: <Rate disabled defaultValue={1} count={1} />
        },
        {
            name: '2',
            value: 2,
            icon: <Rate disabled defaultValue={1} count={1} />
        },
        {
            name: '3',
            value: 3,
            icon: <Rate disabled defaultValue={1} count={1} />
        },
        {
            name: '4',
            value: 4,
            icon: <Rate disabled defaultValue={1} count={1} />
        },
        {
            name: '5',
            value: 5,
            icon: <Rate disabled defaultValue={1} count={1} />
        }
    ]
    return (
        <React.Fragment>
            <span>Filter</span>
            <Radio.Group
                defaultValue={"Semua"}
                size="large"
                onChange={e => actionChangeSelectFilter(e.target.value)}>
                {filterReviewMap.map((review, i) => {
                    return <Radio.Button key={i} value={review.value}>
                        {review.name}{review.icon}
                    </Radio.Button>
                })}
            </Radio.Group>
        </React.Fragment>
    );
};

export default FilterReviewProductDetail;