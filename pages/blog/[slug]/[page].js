import BlogContainer from 'UI/views/Blog';
import { wrapper } from 'store/store';
import { getInitialBlogProps } from 'utils/blogUtils';

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => getInitialBlogProps(store, ctx));

export default BlogContainer;
