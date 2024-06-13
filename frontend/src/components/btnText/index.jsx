import { Container } from "./styles.js";

export function BtnText({title, isActive = false, ...rest}) {
    return (
        <Container type="button" $isactive={isActive.toString()} {...rest}>
            {title}
        </Container>
    )
}