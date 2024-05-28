import DragAndDrop from './AddImage';
import LocationFunction from './Location';
import TextFieldSection from './Comment';

export default function ImageSystem() {
    return (
        <div>
            <LocationFunction />
            <TextFieldSection />
            <DragAndDrop />
        </div>
    );
}
