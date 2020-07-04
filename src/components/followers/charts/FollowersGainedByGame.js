import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { Box } from 'grommet';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { CustomizedYAxisTick } from '../../../utils/ChartUtils';
import { followsGainedByGameSelector } from '../../../redux/selectors/twitchSelectors';

const CustomizedAxisTick = props => {
  const { x, y, payload } = props

  return (
    <g transform={`translate(${x},${y})`}>
      <text dy={16} textAnchor='middle' fill='#BCBCBC' fontSize='12px' fontFamily='Inter'>
        {payload.value}
      </text>
    </g>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length > 0) {
    console.log(payload);
    return (
      <div className='flex flex-col shadow bg-white rounded-md p-4'>
        {payload.map((p) =>
          <div className='flex flex-col'>
            <span className='text-sm font-semibold' style={{ color: p.fill ? p.fill : p.payload.color }}>{p.value} Followers Gained</span>
            <span className='text-sm font-semibold text-gray-500'>{payload.length > 1 ? p.dataKey : label}</span>
          </div>
        )}
      </div>
    )
  }
  return null;
}

const mapStateToProps = (state) => ({
  data: followsGainedByGameSelector(state)
})

const FollowersGainedByGame = ({ data }) => {
  data.forEach((element, index) => {
    index % 4 === 0 ? element.color = '#0C81EB' :
      index % 3 === 0 ? element.color = '#FDBC03' :
        index % 2 === 0 ? element.color = '#836CE8' :
          element.color = '#3ED599';

  });
  const sortedByAvg = R.sort((a, b) => b.gained - a.gained, data);
  const topThreeGames = sortedByAvg.slice(0, 3);
  const restOfGames = sortedByAvg.length > 3 ? sortedByAvg.slice(3, sortedByAvg.length) : [];
  const other = restOfGames.length > 1 ? { game: 'Other' } : null;
  const restOfGamesFormatted = restOfGames.map((game) => {
    other[game.game] = game.gained;
    game = {
      game: 'Other',
      [game.game]: game.gained,
      gameName: game.game,
      color: game.color
    };
    return game;
  });
  data = R.concat(topThreeGames, other ? [other] : []);
  console.log('DATA', data);
  return (
    <Box width='full' height='medium' gap='xsmall'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={data} barCategoryGap='40%'>
          <Tooltip content={CustomTooltip} />
          <XAxis
            dataKey='game'
            tickLine={false}
            axisLine={false}
            tick={<CustomizedAxisTick />}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={<CustomizedYAxisTick />}
            width={40}
          />
          <Bar dataKey='gained' barSize={8}>
            {topThreeGames.map((entry, index) => (
              <Cell key={`cell-${index}`} background={{ fill: '#eee' }} radius={[10, 10, 10, 10]} fill={entry.color} />
            ))}
          </Bar>
          {restOfGamesFormatted.map((game, index) => (
            <Bar
              dataKey={`${game.gameName}`}
              barSize={8}
              stackId='a'
              fill={game.color}
              radius={[
                index === restOfGamesFormatted.length - 1 ? 10 : 0,
                index === restOfGamesFormatted.length - 1 ? 10 : 0,
                index === 0 ? 10 : 0,
                index === 0 ? 10 : 0
              ]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default connect(mapStateToProps, null)(FollowersGainedByGame);
