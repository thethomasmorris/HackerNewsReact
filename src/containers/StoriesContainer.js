import React, { useEffect, useState } from 'react';
import { getStoryIds } from '../services/hnApi';
import { Story } from '../components/Story';
import {
  GlobalStyle,
  StoriesContainerWrapper,
} from '../styles/StoriesContainerStyles';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

export const StoriesContainer = () => {
    const { count } = useInfiniteScroll();
    const [storyIds, setStoryIds] = useState([]);
    
    useEffect(() => {
        getStoryIds().then(data => setStoryIds(data));
        //console.log('useEffect here!')
        //getStory(25023917).then(data => console.log(data));
        
    }, []);
    
    // [] = when the component mounts, do this...
    // [storyIdsUpdated {true,false}]
    // setTimeout example
    // can run into infinite loop if not careful
    
    return (
    <>
      <GlobalStyle />
      <StoriesContainerWrapper data-test-id="stories-container">
        <h1>Hacker News Stories</h1>
        {storyIds.slice(0, count).map(storyId => (
          <Story key={storyId} storyId={storyId} />
        ))}
      </StoriesContainerWrapper>
    </>
  );
};