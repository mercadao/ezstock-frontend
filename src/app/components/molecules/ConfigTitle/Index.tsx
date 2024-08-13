import ConfigIcon from "../../../../../public/assets/icons/ConfigIcon";

export default function ConfigTitle() {
  return (
    <div className="flex items-center gap-2">
      <ConfigIcon />
      <p className="text-lg font-semibold">Configurações</p>
    </div>
  );
}
