import Image from 'next/image';
import React from 'react'
import BookmarkIcon from '../Icons/BookmarkIcon';
import ProductImageGaleryItemRenderer from './ProductImageGaleryItem.Renderer';
import ProductImageGaleryItemEvents from './ProductImageGaleryItem.Events';

export default function ProductImageGaleryItem(props) {

    const { data, index, selected, selectImage } = props;

    const Events = new ProductImageGaleryItemEvents(null, { index, selectImage });
    const Renderer = new ProductImageGaleryItemRenderer(null, { index, selected });

    return (
        <div className={`${Renderer.Classes.Main()}`} onClick={Events.Click}>
            <div className='absolute bg-white left-0 top-0 scale-150 z-10'>
                {data.featuredImage ? <BookmarkIcon className={'scale-150 fill-yellow-600'} /> : null}
            </div>
            <div style={{width: "60px", height: "60px"}} className='relative'>
                <Image src={`${data.url}?box_size=60`} fill={true} alt={data.description} />
            </div>
        </div>
    )
}
