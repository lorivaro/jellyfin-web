import { BaseItemKind } from '@jellyfin/sdk/lib/generated-client/models/base-item-kind';
import React, { FC } from 'react';
import { useGetGenres } from 'hooks/useFetchItems';
import globalize from 'scripts/globalize';
import Loading from 'components/loading/LoadingComponent';
import GenresSectionContainer from './GenresSectionContainer';
import { CollectionType } from 'types/collectionType';
import { ParentId } from 'types/library';

interface GenresItemsContainerProps {
    parentId: ParentId;
    collectionType: CollectionType | undefined;
    itemType: BaseItemKind[];
}

const GenresItemsContainer: FC<GenresItemsContainerProps> = ({
    parentId,
    collectionType,
    itemType
}) => {
    const { isLoading, data: genresResult } = useGetGenres(itemType, parentId);

    if (isLoading) {
        return <Loading />;
    }

    if (!genresResult?.Items?.length) {
        return (
            <div className='noItemsMessage centerMessage'>
                <h1>{globalize.translate('MessageNothingHere')}</h1>
                <p>{globalize.translate('MessageNoGenresAvailable')}</p>
            </div>
        );
    }

    return (
        <>
            {genresResult.Items.map((genre) => (
                <GenresSectionContainer
                    key={genre.Id}
                    collectionType={collectionType}
                    parentId={parentId}
                    itemType={itemType}
                    genre={genre}
                />
            ))}
        </>
    );
};

export default GenresItemsContainer;
