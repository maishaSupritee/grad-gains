const menuBarStyle =
  "h-[3px] w-full bg-slate-400 hover:bg-slate-200 peer-hover:bg-slate-200 transition-all duration-200";

export default function MenuToggle() {
  return (
    <div className="flex h-6 w-6 cursor-pointer flex-col items-center justify-center">
      <input
        type="checkbox"
        id="menuToggle"
        className="peer absolute z-50 h-6 w-6 cursor-pointer opacity-0 outline-none"
      />
      <div
        className={`${menuBarStyle} peer-checked:translate-y-[5px] peer-checked:-rotate-[135deg]`}
      />
      <div className={`${menuBarStyle} mt-[3px] peer-checked:opacity-0`} />
      <div
        className={`${menuBarStyle} mt-[3px] peer-checked:-translate-y-[7px] peer-checked:rotate-[135deg]`}
      />
    </div>
  );
}
