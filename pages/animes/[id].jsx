import { animes } from '../../src/data';
import { useRouter } from 'next/router';

const SingleAnime = ({ anime }) => {

    const { isFallback } = useRouter();

    if (isFallback) {
        return <h1>Loading...</h1>
    }

    const { title, description } = anime;

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

    paths.splice(2, 1);

    return { paths, fallback: true };

    // will not send res to client until data is ready
    // no fallback, loading, just simple blocking
    // return { paths, fallback: 'unstable_blocking' };
}

export const getStaticProps = async ({ params: { id } }) => {
    const anime = animes.find(an => an.id === id);
    return { props: { anime } };
}

export default SingleAnime;