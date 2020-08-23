import { animes } from '../../src/data';
import { useRouter } from 'next/router';

const SingleAnime = ({ anime: { title, description } }) => {

    const { isFallback } = useRouter();

    if (isFallback) {
        <h1>Loading...</h1>
    }

    return (
        <div>
            <h1>
                {title}
            </h1>
            <p>
                {description}
            </p>
        </div>
    )
}

export const getStaticPaths = async () => {
    const paths = animes.map(anime => {
        return { params: { id: anime.id } };
    });
    return { paths, fallback: false };
}

export const getStaticProps = async ({ params: { id } }) => {
    const anime = animes.find(an => an.id === id);
    return { props: { anime } };
}

export default SingleAnime;