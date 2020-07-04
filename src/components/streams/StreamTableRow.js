import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as R from 'ramda';
import ReactTooltip from 'react-tooltip';

import {
  averageViewCountDuringStreamSelector,
  followersGainedDuringStreamSelector
} from '../../redux/selectors/twitchSelectors';
import { twitchApi } from '../../api';

const mapStateToProps = (state, ownProps) => ({
  averageViewCountDuringStream: averageViewCountDuringStreamSelector(ownProps.stream.streamId)(state),
  followersGainedDuringStream: followersGainedDuringStreamSelector(ownProps.stream.streamId)(state)
});

const StreamTableRow = ({
  averageViewCountDuringStream,
  followersGainedDuringStream,
  stream
}) => {
  const [gameImagesPlayedDuringStream, setGameImagesPlayedDuringStream] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  useEffect(() => {
    const fetchGames = async () => {
      const result = await twitchApi.games.get(stream.streamId);
      const filteredGames = R.filter((game) => !R.isNil(game.image), result);
      const images = R.keys(R.groupBy((game) => game.image, filteredGames));
      const sizedImages = R.map((image) => {
        const imageWithHeight = image.replace('{height}', '50');
        return imageWithHeight.replace('{width}', '40');
      }, images)
      setGameImagesPlayedDuringStream(sizedImages);
    }
    fetchGames()
  }, []);
  const firstThreeGames = gameImagesPlayedDuringStream.slice(0, 3);
  const restOfGames = gameImagesPlayedDuringStream.length > 3 ? gameImagesPlayedDuringStream.slice(3, gameImagesPlayedDuringStream.length) : [];
  return (
    <tr>
      <td className='border px-4 py-2 rounded-md'>{moment(stream.startedAt).format('lll')}</td>
      <td className='border px-4 py-2 rounded-md' style={{ maxWidth: 200 }}>{stream.title || '[Title]'}</td>
      <td className='border px-4 py-2 rounded-md'>{stream.endedAt ? `${moment(stream.endedAt).diff(moment(stream.startedAt), 'hour', true).toFixed(1)} hrs` : 'N/A'}</td>
      <td className='border px-4 py-2 rounded-md'>{averageViewCountDuringStream ? averageViewCountDuringStream : 'N/A'}</td>
      <td className='border px-4 py-2 rounded-md'>{stream.viewsAtEnd ? stream.viewsAtEnd - stream.viewsAtBeginning : 'N/A'}</td>
      <td className='border px-4 py-2 rounded-md'>{followersGainedDuringStream}</td>
      <td className='border px-4 py-2 rounded-md'>
        {
          <div className='flex h-full'>
            {
              firstThreeGames.map((image, index) => (
                <img src={image} className={`rounded ${index != 0 ? 'ml-1' : ''}`} />
              ))
            }
            {gameImagesPlayedDuringStream.length > 3 &&
              <div>
                <ReactTooltip id='game-tip'>
                  <div className='flex'>
                    {restOfGames.map((image, index) =>
                      <img src={image} className={`rounded ${index != 0 ? 'ml-1' : ''}`} />
                    )}
                  </div>
                </ReactTooltip>
                <div className='flex items-center ml-1 h-full'>
                  <span
                    className='text-blue-500'
                    data-tip
                    data-for='game-tip'
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    +{gameImagesPlayedDuringStream.length - 3}
                  </span>
                </div>
              </div>
            }
          </div>
        }</td>
    </tr>
  )
};

export default connect(mapStateToProps, null)(StreamTableRow);