import Image from 'next/image';
import styles from './ProfilePicture.module.css';

interface ProfilePictureProps {
  src: string;
  alt: string;
}

export const ProfilePicture = ({ src, alt }: ProfilePictureProps) => (
  <Image
    src={src}
    alt={alt}
    className={styles.profilePicture}
    width={100}
    height={100}
    objectFit="cover"
  />
);
