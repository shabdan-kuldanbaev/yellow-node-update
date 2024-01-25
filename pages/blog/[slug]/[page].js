import BlogContainer from 'UI/views/Blog';
import { reduxStore } from 'redux/store';
import { getInitialBlogProps } from 'utils/blogUtils';

export const getServerSideProps = async (ctx) => getInitialBlogProps(reduxStore, ctx);

export default BlogContainer;
