import React from "react";

export default function TableBody({ companiesInfo }) {
  const descriptionMapping = {
    qualityImprovingActivities: 'Наличие комплекса мероприятий, повышающих стандарты качества изготовления',
    productionTimeDays: 'Срок изготовления лота, дней',
    warrantyPeriodMonths: 'Гарантийные обязательства, дней',
    paymentTerms: 'Условия оплаты',
    productionPrice: 'Стоимость изготовления лота, руб. (без НДС)',
  };

  return (
    <tbody>
    {Object.keys(descriptionMapping).map((setting) => (
      <tr key={setting}>
        <td className="align-middle">
          <span>{descriptionMapping[setting]}</span>
        </td>
        {companiesInfo.map((item) => (
          <td key={item.id} className="text-center align-middle">
            {setting === 'productionPrice' ? (
              <>
              <p className='fw-bold text-primary m-0'>{item[setting][0].toLocaleString('en-US')} руб.</p>
              <p className='fw-bold text-danger m-0'>{item[setting][1].toLocaleString('en-US')} руб.</p>
              <p className='fw-bold text-success m-0'>{item[setting][2].toLocaleString('en-US')} руб.</p>
              </>
            ) : item[setting]}
          </td>
        ))}
      </tr>
    ))}
    </tbody>
  )
}
