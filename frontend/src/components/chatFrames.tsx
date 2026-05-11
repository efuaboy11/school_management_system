"use client"
import React, { useContext, useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';
import {
  PolarAreaController,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import ThemeContext from '@/context/ThemeContext';

Chart.register(PolarAreaController, RadialLinearScale, ArcElement, Tooltip, Legend);

interface UserCounts {
  studentCount: number,
  teacherCount: number,
  parentCount: number,
  staffCount: number,
  label: string,

}


interface SchoolFees {
  allCount: number;
  pendingCount: number;
  successfulCount: number;
  declinedCount: number;
}



export const UsersChart = ({ studentCount, teacherCount, parentCount, staffCount, label }: UserCounts) => {


  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const myChartRef = useRef<Chart | null>(null)

  const { theme } = useContext(ThemeContext)!;


  useEffect(() => {
    if (myChartRef.current) {
      myChartRef.current.destroy();
    }


    // Define the data for the chart
    const data = {
      labels: ['Student', 'Teacher', 'Parent', 'Staff'],
      datasets: [
        {
          label: `${label}`,
          data: [studentCount, teacherCount, parentCount, staffCount],
          backgroundColor: [
            'rgba(120, 62, 188, 0.6)',  // primary-color
            'rgba(65, 74, 202, 0.6)',   // secondary-color
            'rgba(38, 142, 192, 0.6)',  // support-color
            'rgba(47, 179, 122, 0.6)',  // new teal
          ],
          borderColor: [
            'rgba(120, 62, 188, 1)',
            'rgba(65, 74, 202, 1)',
            'rgba(38, 142, 192, 1)',
            'rgba(47, 179, 122, 1)',
          ],

          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            color: theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)' // ⬅️ default light gray for grid lines on light recentThemes
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)' // ⬅️ same here
          }
        },
      },
    };

    // Create the chart instance
    if (chartRef.current) {
      myChartRef.current = new Chart(chartRef.current, {
        type: 'bar',
        data: data,
        options: options,
      });
    }

    // Cleanup to avoid memory leaks
    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, [studentCount, teacherCount, parentCount, staffCount])

  return (
    <div style={{ width: '100%', height: '200px' }}>
      <canvas ref={chartRef} />
    </div>
  );
}


export const SchoolFeesBarChart = ({ allCount, pendingCount, successfulCount, declinedCount }: SchoolFees) => {


  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const myChartRef = useRef<Chart | null>(null)

  const { theme } = useContext(ThemeContext)!;


  useEffect(() => {
    if (myChartRef.current) {
      myChartRef.current.destroy();
    }


    // Define the data for the chart
    const data = {
      labels: ['Total', 'Pending', 'Success', 'Declined'],
      datasets: [
        {
          label: `School Fees Chart`,
          data: [allCount, pendingCount, successfulCount, declinedCount],
          backgroundColor: [
            'rgba(120, 62, 188, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(47, 179, 122, 0.6)',
            'rgba(255, 99, 132, 0.6)',
          ],
          borderColor: [
            'rgba(120, 62, 188, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(47, 179, 122, 1)',
            'rgba(255, 99, 132, 1)',
          ],

          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            color: theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)' // ⬅️ default light gray for grid lines on light recentThemes
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)' // ⬅️ same here
          }
        },
      },
    };

    // Create the chart instance
    if (chartRef.current) {
      myChartRef.current = new Chart(chartRef.current, {
        type: 'bar',
        data: data,
        options: options,
      });
    }

    // Cleanup to avoid memory leaks
    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, [allCount, pendingCount, successfulCount, declinedCount])

  return (
    <div style={{ width: '100%', height: '200px' }}>
      <canvas ref={chartRef} />
    </div>
  );
}



export const SchoolFeesChart = ({
  allCount,
  pendingCount,
  successfulCount,
  declinedCount,
}: SchoolFees) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const myChartRef = useRef<Chart | null>(null);

  const { theme } = useContext(ThemeContext)!;


  useEffect(() => {
    if (myChartRef.current) {
      myChartRef.current.destroy();
    }

    const data = {
      labels: ['all', 'Pending', 'Successful', 'Declined'],
      datasets: [
        {
          label: 'Status Counts',
          data: [allCount, pendingCount, successfulCount, declinedCount],
          backgroundColor: [
            'rgba(120, 62, 188, 0.6)',
            'rgba(255, 206, 86, 0.6)',  // Yellowish for pending
            'rgba(75, 192, 192, 0.6)',  // Greenish for success
            'rgba(255, 99, 132, 0.6)',  // Reddish for declined
          ],
          borderColor: [
            'rgba(120, 62, 188, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
        },
      },

      scales: {
        r: {
          grid: {
            color: theme === 'light'
              ? 'rgba(0, 0, 0, 0.1)'
              : 'rgba(255, 255, 255, 0.1)',
          },
          angleLines: {
            color: theme === 'light'
              ? 'rgba(0, 0, 0, 0.1)'
              : 'rgba(255, 255, 255, 0.1)',
          },
          pointLabels: {
            color: theme === 'light'
              ? '#000'
              : '#fff',
          },
          ticks: {
            color: theme === 'light'
              ? '#000'
              : '#fff',
          }
        }
      }
    };

    if (chartRef.current) {
      myChartRef.current = new Chart(chartRef.current, {
        type: 'polarArea',
        data: data,
        options: options,
      });
    }

    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, [pendingCount, successfulCount, declinedCount]);

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <canvas ref={chartRef} />
    </div>
  );
};




export const BillsChart = ({
  billsCount,
  pendingBillsCount,
  successfulBillsCount,
  declinedBillsCount,
  label

}: {
  billsCount: number;
  pendingBillsCount: number;
  successfulBillsCount: number;
  declinedBillsCount: number;
  label: string
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const myChartRef = useRef<Chart | null>(null);

  const { theme } = useContext(ThemeContext)!;

  useEffect(() => {
    if (myChartRef.current) {
      myChartRef.current.destroy();
    }

    const data = {
      labels: ['All', 'Pending', 'Successful', 'Declined'],
      datasets: [
        {
          label: `${label}`,
          data: [billsCount, pendingBillsCount, successfulBillsCount, declinedBillsCount],
          borderColor: 'rgba(120, 62, 188, 1)',
          backgroundColor: 'rgba(120, 62, 188, 0.3)',
          tension: 0.3,
          fill: true,
          pointBackgroundColor: [
            'rgba(120, 62, 188, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
          ],
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
        },
      },
      scales: {
        x: {
          ticks: {
            color: theme === 'light' ? '#000' : '#fff',
          },
          grid: {
            color: theme === 'light'
              ? 'rgba(0, 0, 0, 0.1)'
              : 'rgba(255, 255, 255, 0.1)',
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: theme === 'light' ? '#000' : '#fff',
          },
          grid: {
            color: theme === 'light'
              ? 'rgba(0, 0, 0, 0.1)'
              : 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    };

    if (chartRef.current) {
      myChartRef.current = new Chart(chartRef.current, {
        type: 'line',
        data: data,
        options: options,
      });
    }

    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, [billsCount, pendingBillsCount, successfulBillsCount, declinedBillsCount, theme]);

  return (
    <div style={{ width: '100%', height: '280px' }}>
      <canvas ref={chartRef} />
    </div>
  );
};


export const SchoolFeesLineChart = ({
  schoolFeesData,
  pendingSchoolFeesData,
  successfulSchoolFeesData,
  declinedSchoolFeesData,
}: {
  schoolFeesData: number;
  pendingSchoolFeesData: number;
  successfulSchoolFeesData: number;
  declinedSchoolFeesData: number;
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const myChartRef = useRef<Chart | null>(null);

  const { theme } = useContext(ThemeContext)!;

  useEffect(() => {
    if (myChartRef.current) {
      myChartRef.current.destroy();
    }

    const data = {
      labels: ['All', 'Pending', 'Successful', 'Declined'],
      datasets: [
        {
          label: 'School Fees Status',
          data: [schoolFeesData, pendingSchoolFeesData, successfulSchoolFeesData, declinedSchoolFeesData],
          borderColor: 'rgba(120, 62, 188, 1)',
          backgroundColor: 'rgba(120, 62, 188, 0.3)',
          tension: 0.3,
          fill: true,
          pointBackgroundColor: [
            'rgba(120, 62, 188, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
          ],
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
        },
      },
      scales: {
        x: {
          ticks: {
            color: theme === 'light' ? '#000' : '#fff',
          },
          grid: {
            color: theme === 'light'
              ? 'rgba(0, 0, 0, 0.1)'
              : 'rgba(255, 255, 255, 0.1)',
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: theme === 'light' ? '#000' : '#fff',
          },
          grid: {
            color: theme === 'light'
              ? 'rgba(0, 0, 0, 0.1)'
              : 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    };

    if (chartRef.current) {
      myChartRef.current = new Chart(chartRef.current, {
        type: 'line',
        data: data,
        options: options,
      });
    }

    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, [schoolFeesData, pendingSchoolFeesData, successfulSchoolFeesData, declinedSchoolFeesData, theme]);

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <canvas ref={chartRef} />
    </div>
  );
};