import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { selectPost, selectIsLoading } from 'redux/selectors/blog';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getPost } from 'redux/actions/blog';
import { Loader } from 'components';

const Post = ({
  currentPost,
  getPost: getPostAction,
  isLoading,
}) => {
  const { query: { post } } = useRouter();

  useEffect(() => {
    if (post) getPostAction(post);
  },[]);

  return (
    <Loader isLoading={!isLoading}>
      <section style={{marginTop: '200px', color: 'white'}}>
        <span>{currentPost.id}</span><br/><br/>
        <span>{currentPost.title}</span>
        <span>{currentPost.publishedDate}</span>
        <p>{currentPost.description}</p>
        <img src={currentPost.image} alt=""/>
      </section>
    </Loader>
  )
};

const mapStateToProps = createStructuredSelector({
  currentPost: selectPost(),
  isLoading: selectIsLoading(),
});

export default connect(mapStateToProps, { getPost })(Post);
