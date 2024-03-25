import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import stringUtils from "@/utils/stringUtils"

export function FormSuccess(props: formStatusInterface) {
    return (
        <>
            {
                !stringUtils.isUndefinedEmptyorNull(props.message) ?
                <Alert variant="default">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertTitle>Success</AlertTitle>
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
