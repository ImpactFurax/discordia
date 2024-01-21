import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation";

interface PopupProps {
  open: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ open, onClose }) => {
  const router = useRouter();
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">Vous aimez ce thread ?</AlertDialogTitle>
          <AlertDialogDescription className="text-lg">
            Connectez-vous pour liker ce thread
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col gap-2">
          <AlertDialogAction className="text-lg font-semibold" onClick={() => router.push('/sign-in')}>Se connecter</AlertDialogAction>
          <AlertDialogCancel className="text-lg font-semibold" onClick={onClose}>Annuler</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Popup