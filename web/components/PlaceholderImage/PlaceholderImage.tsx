interface PlaceholderImageProps {
  className?: string;
  width: number;
  height: number;
}

export const PlaceholderImage = ({ width, height, ...otherProps }: PlaceholderImageProps) =>
  // eslint-disable-next-line @next/next/no-img-element
  <img
    {...otherProps}
    src={`https://via.placeholder.com/${width}x${height}`}
    width={width}
    height={height}
    alt="Placeholder"
  />;
