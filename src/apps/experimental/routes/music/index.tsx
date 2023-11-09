import { BaseItemKind } from '@jellyfin/sdk/lib/generated-client/models/base-item-kind';
import React, { FC } from 'react';
import useCurrentTab from 'hooks/useCurrentTab';
import Page from 'components/Page';
import PageTabContent from '../../components/library/PageTabContent';
import { LibraryTab } from 'types/libraryTab';
import { CollectionType } from 'types/collectionType';
import { LibraryTabContent, LibraryTabMapping } from 'types/libraryTabContent';
import { SectionsView } from 'types/suggestionsSections';

const albumArtistsTabContent: LibraryTabContent = {
    viewType: LibraryTab.AlbumArtists,
    collectionType: CollectionType.Music,
    isBtnSortEnabled: false
};

const albumsTabContent: LibraryTabContent = {
    viewType: LibraryTab.Albums,
    collectionType: CollectionType.Music,
    isBtnPlayAllEnabled: true,
    isBtnShuffleEnabled: true,
    itemType: [BaseItemKind.MusicAlbum]
};

const artistsTabContent: LibraryTabContent = {
    viewType: LibraryTab.Artists,
    collectionType: CollectionType.Music,
    isBtnSortEnabled: false
};

const playlistsTabContent: LibraryTabContent = {
    viewType: LibraryTab.Playlists,
    isBtnFilterEnabled: false,
    isBtnGridListEnabled: false,
    isBtnSortEnabled: false,
    isAlphabetPickerEnabled: false,
    itemType: [BaseItemKind.Playlist]
};

const songsTabContent: LibraryTabContent = {
    viewType: LibraryTab.Songs,
    isBtnGridListEnabled: false,
    isAlphabetPickerEnabled: false,
    itemType: [BaseItemKind.Audio]
};

const suggestionsTabContent: LibraryTabContent = {
    viewType: LibraryTab.Suggestions,
    collectionType: CollectionType.Music,
    sectionsType: {
        suggestionSectionsView: [
            SectionsView.LatestMusic,
            SectionsView.FrequentlyPlayedMusic,
            SectionsView.RecentlyPlayedMusic
        ]
    }
};

const genresTabContent: LibraryTabContent = {
    viewType: LibraryTab.Genres,
    collectionType: CollectionType.Music,
    itemType: [BaseItemKind.MusicAlbum]
};

const musicTabMapping: LibraryTabMapping = {
    0: albumsTabContent,
    1: suggestionsTabContent,
    2: albumArtistsTabContent,
    3: artistsTabContent,
    4: playlistsTabContent,
    5: songsTabContent,
    6: genresTabContent
};

const Music: FC = () => {
    const { searchParamsParentId, currentTabIndex } = useCurrentTab();
    const currentTab = musicTabMapping[currentTabIndex];

    return (
        <Page
            id='musicPage'
            className='mainAnimatedPage libraryPage backdropPage collectionEditorPage pageWithAbsoluteTabs withTabs'
            backDropType='musicartist'
        >
            <PageTabContent
                key={`${currentTab.viewType} - ${searchParamsParentId}`}
                currentTab={currentTab}
                parentId={searchParamsParentId}
            />
        </Page>
    );
};

export default Music;
