import { useState } from "react";
import UIButton from "../../../components/ui/UIButton";
import DeleteDataModal from "../../../components/modal/DeleteDataModal";

const ResetDataButton = () => {
	const [showModal, setShowModal] = useState<boolean>(false);

	return (
		<>
			<UIButton
				variant="danger"
				size="sm"
				title="Delete"
				iconName="Trash2"
				onPress={() => setShowModal(true)}
			/>

			{showModal && (
				<DeleteDataModal
					isVisible={showModal}
					onClose={() => setShowModal(false)}
				/>
			)}
		</>
	);
};

export default ResetDataButton;
