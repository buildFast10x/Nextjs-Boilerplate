import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import stringUtils from "@/utils/stringUtils"

export function FormError(props: formStatusInterface) {
    return (
        <>
            {
                !stringUtils.isUndefinedEmptyorNull(props.message) ?
                    <Alert variant="destructive">
                        <ExclamationTriangleIcon className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {props.message}
                        </AlertDescription>
                    </Alert>
                    :
                    <></>
            }
        </>
    )
}
