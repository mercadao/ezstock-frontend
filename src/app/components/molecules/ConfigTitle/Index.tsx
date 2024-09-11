import ConfigIcon from "../../../../../public/assets/icons/ConfigIcon";

export default function ConfigTitle() {
  return (
    <div className="flex items-center justify-start gap-2">
      <ConfigIcon />
      <p className="text-xl font-semibold">Configurações</p>
    </div>
  );
}
