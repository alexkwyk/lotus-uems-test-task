import React from "react";
import Timer from "./Timer.jsx";


export default function TableHeader({ companiesInfo, activeCompanyId }) {
  return (
    <thead>
    <tr className="align-middle text-center">
      <td className="text-uppercase font-monospace text-primary border-0"><span>Ход</span></td>
      {companiesInfo.map((item) => (
        <td key={item.id} className="border-0">
          {item.id === activeCompanyId ? <Timer /> : ''}
        </td>
      ))}
    </tr>
    <tr className="align-middle text-center text-uppercase font-monospace text-primary border-bottom border-2">
      <td className="col-3">
        <span>Параметры и требования:</span>
      </td>
      {companiesInfo.map((item, index) => (
        <td key={item.id} >
          <span>{`Участник №${index + 1}`}</span>
          <br />
          <span className="fw-bold">{item.name}</span>
        </td>
      ))}
    </tr>
    </thead>
  )
};
