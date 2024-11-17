import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import styles from './index.module.css';

type Props = {
    initialImage: string;
}

const IndexPage: NextPage<Props> = ({initialImage}) => {
    const [image, setImage] = useState(initialImage);
    const [loading, setLoading] = useState(false);
    // useEffect(() => {
    //     fetchImage().then((image) => {
    //         setImage(image.url);
    //         setLoading(false);
    //     });
    // }, []);
    const handleClick = async () => {
        setLoading(true);
        const image = await fetchImage();
        setImage(image.url);
        setLoading(false);
    }
    return (
    <div className={styles.page}>
        <button onClick={handleClick} className={styles.button}>New Cat</button>
        <div className={styles.frame}>{loading || <img src={image} />}</div>
    </div>
    );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const image = await fetchImage();
    return {
        props: {
            initialImage: image.url
        }
    };
};

type Image = {
    url: string;
};

const fetchImage = async () : Promise<Image> => {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await response.json();
    console.log(data);
    return data[0];
}
