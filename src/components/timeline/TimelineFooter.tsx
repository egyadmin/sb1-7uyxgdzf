import React from 'react';

interface TimelineFooterProps {
  dataDate: string;
}

export const TimelineFooter: React.FC<TimelineFooterProps> = ({ dataDate }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-xs space-y-1">
      <p>Data Date: {dataDate}</p>
      <p>TASK Filter: All Activities</p>
      <p>Contract Schedule based on awarded scope of works & Contract BOQ.</p>
      <p className="text-gray-500 mt-2">
        * Critical activities are highlighted in red
        <br />
        * Progress is calculated based on physical completion
        <br />
        * All costs are in Saudi Riyals (SAR)
      </p>
    </div>
  );
};