import React, {useState} from 'react';
import {Spinner, SpinnerSize} from "@fluentui/react";

interface Props {
  onChange?: any
  loading: boolean
}

function SegmentControls(props: Props) {

  return (
    <div>
      {!props.loading && <div className="flex justify-center rounded-lg text-lg" role="group">
        <button
          onClick={() => props.onChange(0)}
          className="bg-white text-red-500 hover:bg-red-300 hover:text-white border border-r-0 border-red-500 rounded-l-lg px-4 py-2 mx-0 outline-none focus:outline-none focus:ring-2 focus:ring-red-500">
          Easy
        </button>
        <button
          onClick={() => props.onChange(1)}
          className="bg-white text-red-500 hover:bg-red-300 hover:text-white border border-red-500  px-4 py-2 mx-0 outline-none focus:outline-none focus:ring-2 focus:ring-red-500">
          Medium
        </button>
        <button
          onClick={() => props.onChange(2)}
          className="bg-white text-red-500 hover:bg-red-300 hover:text-white border border-l-0 border-red-500 rounded-r-lg px-4 py-2 mx-0 outline-none focus:outline-none focus:ring-2 focus:ring-red-500">
          Hard
        </button>
      </div>}
      {props.loading && <Spinner size={SpinnerSize.large}/>}
    </div>
  );
}

export default SegmentControls;
