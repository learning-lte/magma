/**
 * Copyright 2020 The Magma Authors.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @flow strict-local
 * @format
 */

import React from 'react';
import moment from 'moment';

import {Bar, Line} from 'react-chartjs-2';

export function getStepString(delta: number, unit: string) {
  return delta.toString() + unit[0];
}

export function getStep(start: moment, end: moment): [number, string, string] {
  const d = moment.duration(end.diff(start));
  if (d.asMinutes() <= 60.5) {
    return [5, 'minutes', 'HH:mm'];
  } else if (d.asHours() <= 3.5) {
    return [15, 'minutes', 'HH:mm'];
  } else if (d.asHours() <= 6.5) {
    return [15, 'minutes', 'HH:mm'];
  } else if (d.asHours() <= 12.5) {
    return [1, 'hours', 'HH:mm'];
  } else if (d.asHours() <= 24.5) {
    return [2, 'hours', 'HH:mm'];
  } else if (d.asDays() <= 3.5) {
    return [6, 'hours', 'DD-MM-YY HH:mm'];
  } else if (d.asDays() <= 7.5) {
    return [12, 'hours', 'DD-MM-YY HH:mm'];
  } else if (d.asDays() <= 14.5) {
    return [1, 'days', 'DD-MM-YYYY'];
  } else if (d.asDays() <= 30.5) {
    return [1, 'days', 'DD-MM-YYYY'];
  } else if (d.asMonths() <= 3.5) {
    return [7, 'days', 'DD-MM-YYYY'];
  }
  return [1, 'months', 'DD-MM-YYYY'];
}

export type DatasetType = {
  t: number,
  y: number,
};

export type Dataset = {
  label: string,
  borderWidth: number,
  backgroundColor: string,
  borderColor: string,
  hoverBorderColor: string,
  hoverBackgroundColor: string,
  data: Array<DatasetType>,
};

type Props = {
  labels: Array<string>,
  dataset: Array<Dataset>,
};

export default function CustomHistogram(props: Props) {
  return (
    <>
      <Bar
        height={300}
        data={{labels: props.labels, datasets: props.dataset}}
        options={{
          maintainAspectRatio: false,
          scaleShowValues: true,
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  drawBorder: true,
                },
                ticks: {
                  maxTicksLimit: 3,
                },
              },
            ],
          },
        }}
      />
    </>
  );
}

export function CustomLineChart(props: Props) {
  return (
    <>
      <Line
        height={300}
        data={{
          labels: props.labels,
          datasets: props.dataset,
        }}
        legend={{
          display: true,
          position: 'bottom',
          align: 'center',
          labels: {
            boxWidth: 12,
          },
        }}
        options={{
          maintainAspectRatio: false,
          scaleShowValues: true,
          scales: {
            xAxes: {
              gridLines: {
                display: true,
              },
              ticks: {
                maxTicksLimit: 10,
              },
              type: 'time',
              time: {
                round: 'second',
                tooltipFormat: 'YYYY/MM/DD h:mm:ss a',
              },
              scaleLabel: {
                display: true,
                labelString: 'Date',
              },
            },
            yAxes: [
              {
                gridLines: {
                  drawBorder: true,
                },
                ticks: {
                  maxTicksLimit: 3,
                },
                scaleLabel: {
                  display: true,
                  labelString: '',
                },
                position: 'left',
              },
            ],
          },
          tooltips: {
            enabled: true,
            mode: 'nearest',
            callbacks: {
              label: (tooltipItem, data) => {
                const x =
                  data.datasets[tooltipItem.datasetIndex].label +
                  ': ' +
                  tooltipItem.yLabel +
                  ' ' +
                  (data.datasets[tooltipItem.datasetIndex].unit ?? '');
                console.log('tooltip ', x);
                return x;
              },
            },
          },
        }}
      />
    </>
  );
}
