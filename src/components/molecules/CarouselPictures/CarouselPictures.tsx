import { Carousel } from 'antd';

import { Picture } from '@graphql/generated/types';

import 'antd/lib/carousel/style/index.css';

export type CarouselPicturesProps = {
  pictures: Picture[];
  productName: string;
};

export function CarouselPictures(props: CarouselPicturesProps) {
  const { pictures, productName } = props;

  return (
    <Carousel autoplay effect="fade" dots={true}>
      {pictures.map((picture) => {
        return (
          <div key={`picture_${picture.id}`}>
            <img src={picture.url} alt={picture.originalName ?? productName} />
          </div>
        );
      })}
    </Carousel>
  );
}
