import BlogContainer from 'UI/views/Blog';
import { store } from 'store/store';
import { getInitialBlogProps } from 'utils/blogUtils';

export const getServerSideProps = async (ctx) => getInitialBlogProps(store, ctx);

export default BlogContainer;
