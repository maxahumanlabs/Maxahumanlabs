'use client';

import { useState, useEffect } from 'react';

export default function DosingCalculator() {
  const [vialAmountMg, setVialAmountMg] = useState<number>(5);
  const [waterAddedMl, setWaterAddedMl] = useState<number>(2);
  const [desiredDoseMcg, setDesiredDoseMcg] = useState<number>(250);

  const [drawMl, setDrawMl] = useState<string>('0.000');
  const [drawIu, setDrawIu] = useState<string>('0');
  const [dosesPerVial, setDosesPerVial] = useState<string>('0');

  useEffect(() => {
    // Math logic for peptide calculation
    const totalMcg = vialAmountMg * 1000;
    
    if (totalMcg > 0 && waterAddedMl > 0 && desiredDoseMcg > 0) {
      const concentration = totalMcg / waterAddedMl; // mcg per mL
      const calculatedDrawMl = desiredDoseMcg / concentration;
      const calculatedDrawIu = calculatedDrawMl * 100; // assuming U-100 syringe
      const calculatedDoses = totalMcg / desiredDoseMcg;

      setDrawMl(calculatedDrawMl.toFixed(3));
      setDrawIu(Math.round(calculatedDrawIu).toString());
      setDosesPerVial(Math.floor(calculatedDoses).toString());
    } else {
      setDrawMl('0.000');
      setDrawIu('0');
      setDosesPerVial('0');
    }
  }, [vialAmountMg, waterAddedMl, desiredDoseMcg]);

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
        Dosing Calculator
      </h3>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Vial Amount (mg)</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={vialAmountMg || ''}
            onChange={(e) => setVialAmountMg(parseFloat(e.target.value) || 0)}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3b2760] focus:border-transparent transition-all"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Water Added (mL)</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={waterAddedMl || ''}
            onChange={(e) => setWaterAddedMl(parseFloat(e.target.value) || 0)}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3b2760] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Desired Dose (mcg)</label>
          <input
            type="number"
            min="0"
            step="10"
            value={desiredDoseMcg || ''}
            onChange={(e) => setDesiredDoseMcg(parseFloat(e.target.value) || 0)}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3b2760] focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="mt-8 bg-[#f8f9fa] rounded-2xl p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 font-medium text-sm">Draw:</span>
          <span className="text-gray-900 font-bold text-lg">{drawMl} mL</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 font-medium text-sm">Draw (IU):</span>
          <span className="text-gray-900 font-bold text-lg">{drawIu} IU</span>
        </div>
        <div className="flex justify-between items-center border-t border-gray-200 pt-4">
          <span className="text-gray-500 font-medium text-sm">Doses per vial:</span>
          <span className="text-[#3b2760] font-bold text-lg">{dosesPerVial} doses</span>
        </div>
      </div>
    </div>
  );
}
